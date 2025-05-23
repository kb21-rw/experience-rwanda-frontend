export type TripPackageCardProps = {
  pkg: TripPackage;
  idx: number;
  packageOptions: string[];
  toggleOption: (pkgId: number, option: string) => void;
  updateNewOption: (pkgId: number, value: string) => void;
  addCustomOption: (pkgId: number) => void;
  removeCustomOption: (pkgId: number, option: string) => void;
  removeTripPackage: (pkgId: number) => void;
};

export type TripPackage = {
  id: number;
  selectedOptions: string[];
  customOptions: string[];
  newOption: string;
}; 