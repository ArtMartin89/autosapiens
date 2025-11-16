'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const createMessageId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

export default function PrompterPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createMessageId(),
      text: 'Я помогу вам сформулировать хороший промпт для нейросети. Напишите свой запрос',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('prompterSessionId');
      if (!id) {
        id = `prompter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('prompterSessionId', id);
      }
      return id;
    }
    return `prompter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: createMessageId(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/prompter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          sessionId,
          chatId: sessionId,
          userId: sessionId,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      let responseText = '';

      if (data.reply) {
        responseText = data.reply;
      } else if (typeof data === 'string') {
        responseText = data;
      } else if (data.output) {
        responseText = data.output;
      } else if (data.response) {
        responseText = data.response;
      } else if (data.message) {
        responseText = data.message;
      } else if (data.text) {
        responseText = data.text;
      } else {
        responseText = 'Извините, не удалось получить ответ.';
      }

      const botMessage: Message = {
        id: createMessageId(),
        text: responseText || 'Извините, произошла ошибка. Попробуйте еще раз.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending prompter message:', error);

      const errorMessage: Message = {
        id: createMessageId(),
        text: 'Извините, не удалось отправить сообщение. Проверьте подключение к интернету.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4D9CFD 0%, #6BB6FF 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--white)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'var(--text-primary)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--primary-base)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'var(--white)'
            }}>
              AS
            </div>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 700
            }}>
              AutoSapiens Propter
            </span>
          </Link>

          <Link href="/" style={{
            textDecoration: 'none',
            color: 'var(--primary-base)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            На главную
          </Link>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem',
        maxWidth: '900px'
      }}>
        {/* Messages Area */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--white)',
          borderRadius: '1rem 1rem 0 0',
          padding: '2rem',
          overflowY: 'auto',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          marginBottom: 0
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}
            >
              <div style={{
                maxWidth: '70%',
                padding: '1rem 1.25rem',
                borderRadius: message.sender === 'user' 
                  ? '1.25rem 1.25rem 0.25rem 1.25rem'
                  : '1.25rem 1.25rem 1.25rem 0.25rem',
                backgroundColor: message.sender === 'user' 
                  ? 'var(--primary-base)' 
                  : 'var(--light-gray)',
                color: message.sender === 'user' 
                  ? 'var(--white)' 
                  : 'var(--text-primary)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                wordWrap: 'break-word'
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  marginBottom: '0.5rem'
                }}>
                  {message.text}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  opacity: 0.7,
                  textAlign: 'right'
                }}>
                  {message.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '1.25rem 1.25rem 1.25rem 0.25rem',
                backgroundColor: 'var(--light-gray)',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: '0 0 1rem 1rem',
          padding: '1.5rem',
          boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-end'
          }}>
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Введите ваше сообщение..."
              disabled={isLoading}
              rows={3}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '2px solid var(--border-default)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'var(--light-gray)',
                resize: 'none',
                overflowY: 'auto',
                fontFamily: 'inherit',
                lineHeight: '1.5'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-base)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-default)';
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className="btn-primary"
              style={{
                padding: '1rem 2rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: (!inputText.trim() || isLoading) ? 0.5 : 1,
                cursor: (!inputText.trim() || isLoading) ? 'not-allowed' : 'pointer'
              }}
            >
              <span>Отправить</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Typing animation */}
      <style jsx>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary-base);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

