"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store/redux";
import { ResumeForm } from "@/components/ResumeForm";
import { Resume } from "@/components/Resume";

export default function Create() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen w-full flex-col scroll-smooth container p-8">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <ResumeForm />
          </div>
          <div className="col-span-3">
            <Resume />
          </div>
        </div>
      </main>
    </Provider>
  );
}
