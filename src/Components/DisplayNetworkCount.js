function DisplayNetworkCount({network, count}) {
  return (
    <div className="network-card">
      <p>{network}: {count}</p>
    </div>
  );
}

export default DisplayNetworkCount;
