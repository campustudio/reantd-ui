import { rptIds } from './mock';

export const mutatePartDetail = (partDetail) => {
  const { partList = [] } = partDetail;

  if (Array.isArray(partList)) {
    partList.forEach((part) => {
      const { partTypes = [] } = part;
      if (Array.isArray(partTypes)) {
        part.partTypes = partTypes.map(type => ({ id: type, checked: false, disabled: false }));
        // part.partTypes = rptIds.map(id => ({
        //   id,
        //   checked: partTypes.indexOf(id) !== -1,
        //   disabled: partTypes.length === 3 ? (partTypes.indexOf(id) === -1) : false
        // }));
      }
    });
  }

  return partDetail;
};

export default mutatePartDetail;
