import React from 'react';
import { Search, Button } from '@carbon/react';
import { Microphone, SendAlt } from '@carbon/icons-react';
import './ChatField.scss';

interface ChatFieldProps {
  placeholder?: string;
  labelText?: string;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend?: () => void;
  onVoiceInput?: () => void;
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  showVoiceButton?: boolean;
}

/**
 * CHAT_FIELD Template Component
 * 
 * A reusable chat input field with voice and send buttons.
 * Maintains consistent visual styling across the application.
 * 
 * Features:
 * - Carbon Search component with large size
 * - Voice input button (microphone icon)
 * - Send button (send icon)
 * - Consistent styling and spacing
 * 
 * @example
 * <ChatField
 *   placeholder="Chat with IBM Cloud AI"
 *   labelText="AI Search"
 *   id="ai-search"
 *   onChange={handleChange}
 *   onSend={handleSend}
 * />
 */
const ChatField: React.FC<ChatFieldProps> = ({
  placeholder = 'Chat with IBM Cloud AI',
  labelText = 'AI Search',
  id = 'chat-field',
  onChange,
  onKeyDown,
  onSend,
  onVoiceInput,
  value,
  size = 'lg',
  showVoiceButton = true,
}) => {
  return (
    <div className="chat-field-container">
      <Search
        size={size}
        placeholder={placeholder}
        labelText={labelText}
        closeButtonLabelText="Clear search input"
        id={id}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
      <div className="chat-field-actions">
        {showVoiceButton && (
          <Button
            kind="ghost"
            size={size}
            renderIcon={Microphone}
            iconDescription="Voice input"
            hasIconOnly
            onClick={onVoiceInput}
          />
        )}
        <Button
          kind="ghost"
          size={size}
          renderIcon={SendAlt}
          iconDescription="Send"
          hasIconOnly
          onClick={onSend}
        />
      </div>
    </div>
  );
};

export default ChatField;

// Made with Bob
