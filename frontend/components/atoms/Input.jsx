const Input = (props) => {
  return (
    <div>
      <input
        className="input"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          border: none;
        }
      `}</style>
    </div>
  );
};
