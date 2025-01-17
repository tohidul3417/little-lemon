import { useReducer, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "react-hot-toast";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Mail,
  Phone,
  FileText,
  Gift,
} from "lucide-react";
import { fetchAPI, submitAPI } from "../utils/api";
import { ACTIONS, initialState, reservationReducer } from "../store/reservationStore";
import { reservationSchema } from "../schemas/reservationSchema";
import SuccessToast from "../components/reservations/SuccessToast";
import "../styles/Reservations.css";


function Reservations() {
  const [state, dispatch] = useReducer(reservationReducer, initialState, () => {
    const savedState = localStorage.getItem("reservationState");
    return savedState ? JSON.parse(savedState) : initialState;
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: "",
      time: "",
      guests: "2",
      occasion: "",
      seating: "indoor",
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const selectedDate = watch("date");

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("reservationState", JSON.stringify(state));
  }, [state]);

  // Cleanup old reservations
  const cleanupOldReservations = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedReservedSlots = Object.entries(state.reservedSlots).reduce(
      (acc, [date, times]) => {
        if (new Date(date) >= today) {
          acc[date] = times;
        }
        return acc;
      },
      {}
    );

    if (
      Object.keys(updatedReservedSlots).length !==
      Object.keys(state.reservedSlots).length
    ) {
      dispatch({
        type: ACTIONS.UPDATE_RESERVED_SLOTS,
        payload: updatedReservedSlots,
      });
    }
  };

  useEffect(() => {
    cleanupOldReservations();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      dispatch({ type: ACTIONS.FETCH_TIMES_START });
      try {
        const times = fetchAPI(new Date(selectedDate));
        // Filter out reserved times for the selected date
        const availableTimes = times.filter(
          (time) => !state.reservedSlots[selectedDate]?.includes(time)
        );
        dispatch({
          type: ACTIONS.FETCH_TIMES_SUCCESS,
          payload: availableTimes,
        });
        setValue("time", "");
      } catch (error) {
        dispatch({
          type: ACTIONS.FETCH_TIMES_ERROR,
          payload: "Failed to fetch available times",
        });
      }
    }
  }, [selectedDate, setValue, state.reservedSlots]);

  const isTimeSlotAvailable = (date, time) => {
    return !state.reservedSlots[date]?.includes(time);
  };

  const onSubmit = async (data) => {
    dispatch({ type: ACTIONS.SUBMIT_START });
    try {
      const success = await submitAPI(data);
      if (success) {
        // Update the reserved slots
        dispatch({
          type: ACTIONS.UPDATE_TIME_SLOT,
          payload: {
            date: data.date,
            time: data.time,
          },
        });

        dispatch({
          type: ACTIONS.SUBMIT_SUCCESS,
          payload: data,
        });

        toast.custom(
          (t) => (
            <div
              className={`toast-container ${
                t.visible ? "toast-enter" : "toast-exit"
              }`}
            >
              <SuccessToast data={data} />
            </div>
          ),
          {
            duration: 5000,
            position: "top-center",
          }
        );

        // Reset form but keep reserved slots
        reset({
          date: "",
          time: "",
          guests: "2",
          occasion: "",
          seating: "indoor",
          name: "",
          email: "",
          phone: "",
          specialRequests: "",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.SUBMIT_ERROR,
        payload: "Failed to submit reservation",
      });
      toast.error("Failed to submit reservation. Please try again.");
    }
  };

  return (
    <main className="reservations-page">
      <Toaster />

      <section className="reservations-hero">
        <div className="container">
          <h1>Reserve a Table</h1>
          <p>Join us for an unforgettable Mediterranean dining experience</p>
        </div>
      </section>
      <section className="reservations-content">
        <div className="container">
          {state.submitSuccess && state.lastSubmittedData ? (
            <div className="confirmation-card">
              <div className="confirmation-header">
                <h2>Reservation Confirmed!</h2>
                <p className="confirmation-subtitle">
                  Thank you for choosing Little Lemon
                </p>
              </div>

              <div className="confirmation-body">
                <div className="confirmation-section">
                  <h3>Date & Time</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <Calendar className="info-icon" />
                      <div>
                        <strong>Date</strong>
                        <p>
                          {new Date(
                            state.lastSubmittedData.date
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="info-item">
                      <Clock className="info-icon" />
                      <div>
                        <strong>Time</strong>
                        <p>{state.lastSubmittedData.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="confirmation-section">
                  <h3>Reservation Details</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <Users className="info-icon" />
                      <div>
                        <strong>Party Size</strong>
                        <p>
                          {state.lastSubmittedData.guests}{" "}
                          {state.lastSubmittedData.guests === 1
                            ? "Guest"
                            : "Guests"}
                        </p>
                      </div>
                    </div>
                    <div className="info-item">
                      <MapPin className="info-icon" />
                      <div>
                        <strong>Seating</strong>
                        <p>
                          {state.lastSubmittedData.seating
                            .charAt(0)
                            .toUpperCase() +
                            state.lastSubmittedData.seating.slice(1)}
                        </p>
                      </div>
                    </div>
                    {state.lastSubmittedData.occasion && (
                      <div className="info-item">
                        <Gift className="info-icon" />
                        <div>
                          <strong>Occasion</strong>
                          <p>{state.lastSubmittedData.occasion}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="confirmation-section">
                  <h3>Contact Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <Mail className="info-icon" />
                      <div>
                        <strong>Email</strong>
                        <p>{state.lastSubmittedData.email}</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <Phone className="info-icon" />
                      <div>
                        <strong>Phone</strong>
                        <p>{state.lastSubmittedData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {state.lastSubmittedData.specialRequests && (
                  <div className="confirmation-section">
                    <h3>Special Requests</h3>
                    <div className="info-item special-requests">
                      <FileText className="info-icon" />
                      <div>
                        <p>{state.lastSubmittedData.specialRequests}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => dispatch({ type: ACTIONS.RESET })}
              >
                Make Another Reservation
              </button>
            </div>
      
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="reservation-form"
              noValidate
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="date">Date*</label>
                  <input
                    type="date"
                    id="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date")}
                  />
                  {errors.date && (
                    <span className="error-message">{errors.date.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time*</label>
                  <select
                    id="time"
                    {...register("time")}
                    disabled={state.isLoading || !selectedDate}
                    className={state.isLoading ? "loading" : ""}
                  >
                    <option value="">Select time</option>
                    {state.availableTimes.map((time) => (
                      <option
                        key={time}
                        value={time}
                        disabled={!isTimeSlotAvailable(selectedDate, time)}
                        className={
                          !isTimeSlotAvailable(selectedDate, time)
                            ? "time-slot-unavailable"
                            : ""
                        }
                      >
                        {time}{" "}
                        {!isTimeSlotAvailable(selectedDate, time)
                          ? "(Unavailable)"
                          : ""}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <span className="error-message">{errors.time.message}</span>
                  )}
                  {selectedDate && state.availableTimes.length === 0 && (
                    <span className="time-slot-helper">
                      No available times for this date
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="guests">Number of Guests*</label>
                  <select id="guests" {...register("guests")}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <span className="error-message">
                      {errors.guests.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="occasion">Occasion</label>
                  <select id="occasion" {...register("occasion")}>
                    <option value="">Select occasion</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Business">Business Meal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="seating">Seating Preference*</label>
                  <select id="seating" {...register("seating")}>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                  {errors.seating && (
                    <span className="error-message">
                      {errors.seating.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name*</label>
                <input type="text" id="name" {...register("name")} />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" {...register("email")} />
                  {errors.email && (
                    <span className="error-message">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input type="tel" id="phone" {...register("phone")} />
                  {errors.phone && (
                    <span className="error-message">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  rows="4"
                  {...register("specialRequests")}
                ></textarea>
              </div>

              {state.error && (
                <div className="error-message form-error">{state.error}</div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? "Submitting..." : "Reserve Table"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Reservations;
