import {
  faFloppyDisk,
  faRectangleXmark,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export const SystemMessage = ({
  clearHistory,
  setSystemMessage,
  systemMessage,
  systemMessageRef,
}) => {
  const [localSystemMessage, setLocalSystemMessage] = useState('');
  const [originalSystemMessage, setOriginalSystemMessage] = useState('');

  useEffect(() => {
    // console.log(systemMessage);
    setOriginalSystemMessage(systemMessage);
    setLocalSystemMessage(systemMessage);
  }, [systemMessage]);

  const cancelClickHandler = () => {
    setSystemMessage(originalSystemMessage);
    const systemMessageMenu = document.querySelectorAll(
      'details.system-message-dropdown'
    );
    for (const menu of systemMessageMenu) {
      if (menu) {
        menu.removeAttribute('open');
      }
    }
  };

  const resetClickHandler = () => {
    if (localSystemMessage !== originalSystemMessage) {
      if (confirm('Are you sure you want to reset your unsaved changes?')) {
        setSystemMessage(originalSystemMessage);
        setLocalSystemMessage(originalSystemMessage);
      }
    }
  };

  const saveClickHandler = () => {
    if (localSystemMessage !== originalSystemMessage) {
      if (
        confirm(
          'Are you sure you want to change the system message?\n\nNOTE: This will also clear your chat history and reload the app.'
        )
      ) {
        setLocalSystemMessage(localSystemMessage);
        setSystemMessage(localSystemMessage);
        clearHistory();
      }
    }
  };

  return (
    <>
      <textarea
        className="h-48 whitespace-pre-line w-40 m-2 lg:w-96"
        ref={systemMessageRef}
        onChange={(e) => setLocalSystemMessage(e.target.value)}
        value={localSystemMessage}
      />
      <div className="join">
        <button
          className="btn btn-sm lg:btn-md join-item btn-info"
          type="button"
          onClick={cancelClickHandler}
        >
          <FontAwesomeIcon icon={faRectangleXmark} />
          <span className="hidden lg:flex">Close</span>
        </button>
        <button
          className={`btn btn-sm lg:btn-md join-item btn-error${
            localSystemMessage?.trim() === originalSystemMessage?.trim()
              ? ' btn-disabled'
              : ''
          }`}
          type="button"
          onClick={resetClickHandler}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          <span className="hidden lg:flex">Reset</span>
        </button>
        <button
          className={`btn btn-sm lg:btn-md join-item btn-success${
            localSystemMessage?.trim() === originalSystemMessage?.trim()
              ? ' btn-disabled'
              : ''
          }`}
          type="button"
          disabled={
            localSystemMessage?.trim() === originalSystemMessage?.trim()
          }
          onClick={saveClickHandler}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          <span className="hidden lg:flex">Save</span>
        </button>
      </div>
    </>
  );
};

SystemMessage.displayName = 'SystemMessage';
SystemMessage.propTypes = {
  clearHistory: PropTypes.func.isRequired,
  setSystemMessage: PropTypes.func.isRequired,
  systemMessage: PropTypes.string.isRequired,
  systemMessageRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
};

export default SystemMessage;
