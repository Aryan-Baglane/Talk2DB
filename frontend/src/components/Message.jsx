import ResultTable from './ResultTable';

function Message({ message }) {
  const getConfidenceClass = (confidence) => {
    if (confidence >= 0.7) return 'confidence-high';
    if (confidence >= 0.4) return 'confidence-medium';
    return 'confidence-low';
  };

  return (
    <div className={`message ${message.type}`}>
      <div className="message-avatar">
        {message.type === 'user' ? 'U' : 'AI'}
      </div>
      <div className="message-content">
        {message.type === 'user' ? (
          message.content
        ) : (
          <>
            {message.error ? (
              <div className="error-message">
                ❌ Error: {message.error}
              </div>
            ) : message.success ? (
              <div className="success-message">
                ✅ {message.content}
                {message.reEmbeddedCount > 0 && (
                  <><br />Re-synced {message.reEmbeddedCount} embeddings.</>
                )}
              </div>
            ) : (
              <>
                {message.answer ? (
                  <>
                    <strong>Answer:</strong>
                    <br />
                    {message.answer}
                    {message.context && message.context.length > 0 && (
                      <>
                        <br /><br />
                        <strong>Sources:</strong>
                        <ResultTable data={message.context} />
                      </>
                    )}
                  </>
                ) : message.data && message.data.length > 0 ? (
                  <>
                    <strong>Found {message.data.length} result(s):</strong>
                    <ResultTable data={message.data} />
                  </>
                ) : (
                  <>
                    <strong>No results found</strong>
                    <br />
                    Try refining your query or using different keywords.
                  </>
                )}
                
                {message.confidence !== undefined && (
                  <span className={`confidence-badge ${getConfidenceClass(message.confidence)}`}>
                    Confidence: {(message.confidence * 100).toFixed(1)}%
                  </span>
                )}
                
                {message.mongoQuery && (
                  <div style={{ marginTop: '10px', fontSize: '0.85em', color: '#666' }}>
                    MongoDB Query: <code>{JSON.stringify(message.mongoQuery)}</code>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
