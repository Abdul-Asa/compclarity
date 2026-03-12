import DropdownButton from "../Buttons/DropdownButton";
import SearchBar from "./SearchBar";

interface OfferTableControlsProps {
  isCompanyPage: Boolean;
}

export default function OfferTableControls({ isCompanyPage }: OfferTableControlsProps) {
  return (
    <div className="flex gap-3 sm:gap-5 flex-col sm:flex-row flex-wrap items-center sm:justify-center pt-2 pb-4">
      <SearchBar isCompanyPage={isCompanyPage} />
      <DropdownButton />
    </div>
  );
}
