type BlockProps = {
  onClick: (e: any) => void;
  dataId: number;
};

const Block: React.FC<BlockProps> = ({ onClick, dataId }) => {
  return (
    <div data-id={dataId} onClick={(e) => onClick(e)} className="block"></div>
  );
};

export default Block;
