import './Modal.css';

const modal = props => {
  const cssClasses = ["Modal"]
  if(props.show=='entering') cssClasses.push("ModalOpen")
  else if(props.show=='exiting') cssClasses.push("ModalClosed")

  return (
    <div className={cssClasses.join(' ')}>
      <h1>A Modal</h1>
      <button className="Button" onClick={props.closed}>
        Dismiss
      </button>
    </div>
  );
};

export default modal;