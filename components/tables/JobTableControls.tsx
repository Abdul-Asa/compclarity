import DropdownButton from "../Buttons/DropdownButton";
import SearchBar from "./SearchBar";

interface JobTableControlsProps {
  isCompanyPage: Boolean;
}

export default function JobTableControls({ isCompanyPage }: JobTableControlsProps) {
  return (
    <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row flex-wrap items-center sm:justify-center pt-2 pb-4">
      <SearchBar isCompanyPage={isCompanyPage} isForJob={true} />
      <div className="flex flex-row items-center gap-3">
        <DropdownButton isIndustyDropDown={true} />
        <DropdownButton isForJobs={true} />
      </div>
    </div>
  );
}
