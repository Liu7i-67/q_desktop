interface IProps {
  title: string;
}

const InfoTitle = (props: IProps) => {
  const { title } = props;
  return (
    <div className={"text-[16px] font-bold text-primary mb-2 select-none"}>
      {title}
    </div>
  );
};

export default InfoTitle;
