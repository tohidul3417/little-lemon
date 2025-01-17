import { Check, Calendar, Clock, Users } from "lucide-react";


export function SuccessToast ({ data }) {
    return (
        <div className="toast-content">
          <div className="toast-header">
            <Check className="toast-check-icon" />
            <h3 className="toast-title">Reservation Confirmed!</h3>
          </div>
          <div className="toast-details">
            <div className="toast-info-item">
              <Calendar className="toast-icon" />
              <span>
                {new Date(data.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="toast-info-item">
              <Clock className="toast-icon" />
              <span>{data.time}</span>
            </div>
            <div className="toast-info-item">
              <Users className="toast-icon" />
              <span>
                {data.guests} {data.guests === 1 ? "Guest" : "Guests"}
              </span>
            </div>
          </div>
        </div>
      );
}
