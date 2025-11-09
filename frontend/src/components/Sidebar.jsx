function Sidebar() {
  const exampleQueries = [
    {
      text: "Find managers with CTC > 50 LPA",
      query: "Find all managers with CTC greater than 50 LPA",
      type: "hybrid"
    },
    {
      text: "Show me people in CO branch",
      query: "Show me people in CO branch",
      type: "hybrid"
    },
    {
      text: "Tell me about Kangan Gupta",
      query: "Tell me about Kangan Gupta",
      type: "hybrid"
    },
    {
      text: "Find tech branches with CGPA > 8",
      query: "Find all tech branches with CGPA above 8",
      type: "hybrid"
    },
    {
      text: "What is the average CTC?",
      query: "What is the average CTC in the database?",
      type: "hybrid"
    },
    {
      text: "Update CTC for Kangan Gupta",
      query: "Change the CTC for Kangan Gupta to 70",
      type: "update"
    },
    {
      text: "Change branch for Vidit Tayal",
      query: "Update Vidit Tayal's branch to IT",
      type: "update"
    }
  ];

  const handleExampleClick = (query) => {
    const event = new CustomEvent('exampleQuery', { detail: query });
    window.dispatchEvent(event);
  };

  return (
    <div className="sidebar">
      <h3>📝 Example Queries</h3>
      {exampleQueries.map((item, index) => (
        <div
          key={index}
          className="example-query"
          onClick={() => handleExampleClick(item)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
