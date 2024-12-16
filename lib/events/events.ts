export type EventName =
    | "login"
    | "signup"
    | "logout"
    | "view_offer"
    | "track_job"
    | "apply_for_job"
    | "view_job"
    | "view_company";

export type EventProperties = {
    login: {
        email: string;
    };
    signup: {
        email: string;
        method: "email" | "google" | "linkedin";
    };
    logout: {};
    view_offer: {
        offerId: string;
        offerName: string;
    };
    track_job: {
        jobId: string;
        jobTitle: string;
    };
    apply_for_job: {
        jobId: string;
        jobTitle: string;
    };
    view_job: {
        jobId: string;
        jobTitle: string;
    };
    view_company: {
        companyId: string;
        companyName: string;
    };
};
