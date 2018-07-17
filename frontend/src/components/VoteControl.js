import React from "react";

export default ({voteScore, onDownVote, onUpVote}) => (
	<React.Fragment>
		<small><strong>{voteScore} {Math.abs(voteScore) === 1 ? 'vote ' : 'votes '}</strong></small>
		<button onClick={onDownVote}>▼</button>
		<button onClick={onUpVote}>▲</button>
	</React.Fragment>
);