import Link from "next/link";
import React from "react";
import { AlertTriangle, Check, UploadCloud } from "react-feather";

const StatusModal = ({ loading, success, error, next }) => {
  return (
    <>
      {(success || loading || error) && (
        <div className="status-modal__root">
          <div className="status-modal__wrapper">
            <div className="status-modal__container">
              <>
                {success && !loading && (
                  <div className="status-modal__icon">
                    <Check />
                  </div>
                )}
                {loading && (
                  <div className="status-modal__icon">
                    <UploadCloud />
                  </div>
                )}
                {error && !loading && (
                  <div className="status-modal__icon">
                    <AlertTriangle />
                  </div>
                )}
              </>
              <h3>
                {loading
                  ? "Saving..."
                  : success
                  ? "Saved Successfull"
                  : "Saving Failed"}
              </h3>
              {success && (
                <div className="mt-4">
                  <Link href="/dashboard/listings">
                    <button
                      className="p-3 w-full rounded bg-primary text-white text-center"
                      disabled={loading}
                    >
                      View Listings
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusModal;
