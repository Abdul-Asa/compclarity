import AddCompensationButton from "../Buttons/AddCompensationButton";
import DropdownButton from "../Buttons/DropdownButton";
import YoeDropdownButton from "../Buttons/YoeDropdownButton";
import SearchBar from "./SearchBar";
import VerifiedFilterCheckbox from "./VerifiedFilterCheckbox";

interface OfferTableControlsProps {
  isCompanyPage: Boolean;
}

export default function OfferTableControls({ isCompanyPage }: OfferTableControlsProps) {
  return (
    <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row flex-wrap items-center sm:justify-center pt-2 pb-4">
      <SearchBar isCompanyPage={isCompanyPage} />
      <div className="flex flex-row items-center gap-3">
        <DropdownButton />
        <YoeDropdownButton />
      </div>
      <VerifiedFilterCheckbox />
      <AddCompensationButton />
    </div>
  );
}
