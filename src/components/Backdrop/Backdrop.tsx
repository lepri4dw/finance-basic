import React from 'react';

interface Props {
  show: boolean;
}

const Backdrop: React.FC<Props> = ({show}) => {
  return (
    <div
      className="modal-backdrop show"
      style={{display: show ? 'block': 'none'}}
    />
  );
};

export default Backdrop;