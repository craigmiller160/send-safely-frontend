import './Packages.scss';
import { PackagesTable } from './PackagesTable';
import { PackageType } from './PackageType';

export const Packages = () => {
	return (
		<div className="PackagesPage">
			<PackagesTable packageType={PackageType.SENT} />
			<PackagesTable packageType={PackageType.RECEIVED} />
		</div>
	);
};
