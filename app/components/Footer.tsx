import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';

import { TokenStateProvider } from '@/app/contexts/TokenContext';

import { TokenCount } from '@/app/components/TokenCount';

export const Footer = memo(
  ({
    formRef,
    textAreaRef,
    handleSubmit,
    input,
    isLoading,
    handleInputChange,
    systemMessageRef,
  }) => {
    useEffect(() => {
      if (document?.activeElement !== systemMessageRef?.current && !isLoading) {
        textAreaRef?.current?.focus();
      }
    }, [isLoading, textAreaRef, systemMessageRef]);

    const [isMac, setIsMac] = useState(false);
    useEffect(() => {
      setIsMac(navigator?.userAgent?.toLowerCase().includes('mac'));
    }, []);

    const [modifierKey, setModifierKey] = useState('⌘');
    useEffect(() => {
      setModifierKey(isMac ? '⌘' : 'Ctrl');
    }, [isMac]);

    return (
      <footer className="fixed bottom-0 z-40 w-full px-4 py-2 text-center lg:p-4 bg-base-300">
        <form ref={formRef} onSubmit={handleSubmit} className="w-full">
          <TokenStateProvider>
            <TokenCount
              input={input}
              systemMessage={systemMessageRef?.current?.value || ''}
              display={'input'}
            />
          </TokenStateProvider>
          <textarea
            autoFocus={true}
            ref={textAreaRef}
            className={`${
              isLoading ? 'skeleton' : ''
            } w-full max-w-6xl p-2 overflow-x-hidden overflow-y-auto text-sm border border-gray-300 rounded shadow-xl h-14 lg:text-base lg:h-20`}
            value={input}
            placeholder="Type a message..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="button"
            className="mb-2 btn-block btn btn-xs btn-primary lg:hidden"
            onClick={handleSubmit}
          >
            send message
          </button>
          <br />
          <small className="hidden text-xs bottom-8 lg:inline-block">
            <kbd className="kbd">Enter</kbd> to send /
            <kbd className="kbd">Shift</kbd>+<kbd className="kbd">Enter</kbd>{' '}
            for new line /<kbd className="kbd">{modifierKey}</kbd>+
            <kbd className="kbd">Esc</kbd> to clear history
          </small>
        </form>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
Footer.propTypes = {
  formRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  textAreaRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object }),
  ]),
  handleSubmit: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Footer;
