import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function InputArea({ queryType, setQueryType, isLoading, setIsLoading, messages, setMessages }) {
  const [userInput, setUserInput] = useState('');
  const [collection, setCollection] = useState('managers');

  useEffect(() => {
    const handleExampleQuery = (event) => {
      const { query, type } = event.detail;
      setQueryType(type);
      setUserInput(query);
      // Auto-submit after a short delay
      setTimeout(() => handleSend(query, type), 100);
    };

    window.addEventListener('exampleQuery', handleExampleQuery);
    return () => window.removeEventListener('exampleQuery', handleExampleQuery);
  }, [collection]);

  const handleSend = async (query = userInput, type = queryType) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: trimmedQuery
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const endpoint = type === 'hybrid' ? '/api/hybrid-query' : '/api/update-query';
      const response = await axios.post(`${config.API_URL}${endpoint}`, {
        userInput: trimmedQuery,
        collectionName: collection
      });

      const result = response.data;
      
      // Create AI response message
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant'
      };

      if (type === 'hybrid') {
        if (result.winner === 'rag') {
          aiMessage.answer = result.answer;
          aiMessage.context = result.context;
          aiMessage.confidence = result.confidence;
        } else {
          aiMessage.data = result.data;
          aiMessage.confidence = result.confidence;
          aiMessage.mongoQuery = result.mongoQuery;
        }
      } else {
        // Update query
        if (result.modifiedCount > 0) {
          aiMessage.success = true;
          aiMessage.content = `Successfully updated ${result.modifiedCount} document(s)!`;
          aiMessage.reEmbeddedCount = result.reEmbeddedCount;
        } else {
          aiMessage.error = 'No documents were modified. Please check your query.';
        }
      }

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        error: error.response?.data?.error || error.message || 'Request failed'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="input-area">
      <div className="query-type-toggle">
        <button
          className={`toggle-btn ${queryType === 'hybrid' ? 'active' : ''}`}
          onClick={() => setQueryType('hybrid')}
        >
          🔍 Query
        </button>
        <button
          className={`toggle-btn ${queryType === 'update' ? 'active' : ''}`}
          onClick={() => setQueryType('update')}
        >
          ✏️ Update
        </button>
      </div>
      <div className="input-wrapper">
        <div className="input-group">
          <label htmlFor="collection">Collection</label>
          <select
            id="collection"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          >
            <option value="managers">Managers</option>
            <option value="employees">Employees</option>
          </select>
        </div>
        <div className="input-group" style={{ flex: 3 }}>
          <label htmlFor="userInput">Your Question</label>
          <input
            type="text"
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              queryType === 'hybrid'
                ? 'e.g., Find all managers with CTC greater than 50 LPA'
                : 'e.g., Change the CTC for Kangan Gupta to 70'
            }
            autoComplete="off"
            disabled={isLoading}
          />
        </div>
        <div className="action-buttons">
          <button
            className="btn btn-primary"
            onClick={() => handleSend()}
            disabled={isLoading}
          >
            {isLoading ? <span className="loading"></span> : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputArea;
