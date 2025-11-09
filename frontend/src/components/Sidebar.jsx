function Sidebar() {
  const exampleQueries = [
    // Vector Search examples
    {
      text: "Tell me about John Doe",
      query: "Tell me about John Doe",
      type: "hybrid"
    },
    {
      text: "Who works at Google?",
      query: "Who works at Google?",
      type: "hybrid"
    },
    // Database Query examples
    {
      text: "Find people with CTC > 50 LPA",
      query: "Find all people with CTC greater than 50",
      type: "hybrid"
    },
    {
      text: "Show me CO branch people",
      query: "Show me people in CO branch",
      type: "hybrid"
    },
    // Calculator examples
    {
      text: "Calculate 123 + 456",
      query: "What is 123 + 456?",
      type: "hybrid"
    },
    {
      text: "20% of 500",
      query: "Calculate 20% of 500",
      type: "hybrid"
    },
    // Aggregation examples
    {
      text: "Average CTC by branch",
      query: "What is the average CTC by branch?",
      type: "hybrid"
    },
    {
      text: "Count people per company",
      query: "How many people work at each company?",
      type: "hybrid"
    },
    // Update examples
    {
      text: "Update John's CTC to 70",
      query: "Change the CTC for John Doe to 70",
      type: "update"
    },
    {
      text: "Change Jane's branch to IT",
      query: "Update Jane Smith's branch to Information Technology",
      type: "update"
    }
  ];

  const handleExampleClick = (example) => {
    const event = new CustomEvent('exampleQuery', {
      detail: { 
        query: example.text,
        mode: example.mode
      }
    });
    window.dispatchEvent(event);
  };

  // Group examples by mode
  const queryExamples = exampleQueries.filter(e => e.mode === 'query');
  const updateExamples = exampleQueries.filter(e => e.mode === 'update');

  return (
    <div className="sidebar">
      <h3>🔍 Query Examples</h3>
      {queryExamples.map((example, index) => (
        <div
          key={`query-${index}`}
          className="example-query"
          onClick={() => handleExampleClick(example)}
        >
          {example.text}
        </div>
      ))}

      <h3 style={{ marginTop: '30px' }}>✏️ Update Examples</h3>
      {updateExamples.map((example, index) => (
        <div
          key={`update-${index}`}
          className="example-query"
          onClick={() => handleExampleClick(example)}
        >
          {example.text}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
