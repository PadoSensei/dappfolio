//@ts-nocheck

function ProposalCard(data) {
    const proposalID = () => {
        return(
            <div className="ProposalID StatsFont">
                <p>ID: {data.proposal.proposalID}</p>
            </div>
        )
    }
    const propState = () => {
        return(
            <div className="ProposalState StatsFont">
                <p>State: {data.proposal.propState}</p>
            </div>
        )
    }
    const votesFor = () => {
        return(
            <div className="VotesFor">
                <p>Votes For:</p>
                <p>{data.proposal.votesFor}</p>
                <br></br>
            </div>
        )
    }
    const votesAgainst = () => {
        return(
            <div className="VotesAgainst">
                <p>Votes Against:</p>
                <p>{data.proposal.votesAgainst}</p>
                <br></br>
            </div>
        )
    }
    const memberVoteCount = () => {
        return(
            <div className="MemberCount">
                <p>Member Participation:</p>
                <p>{data.proposal.memberVoteCount}</p>
                <br></br>
            </div>
        )
    }
    const quorum = () => {
        return(
            <div className="Quorum">
                <p>Quorum:</p>
                <p>{data.quorum}</p>
                <br></br>
            </div>
        )
    }
    const voteBegins = () => {
        return(
            <div className="VotingBegins">
                <p>Voting Begins: </p>
                <p>{data.proposal.voteBegins}</p>
                <br></br>
            </div>
        )
    }
    const voteEnds = () => {
        return(
            <div className="VotingEnds">
                <p>Voting Ends:</p>
                <p>{data.proposal.voteEnds}</p>
            </div>
        )
    }
    const votingEnded = () => {
        return(
            <div className="VotingEnded">
                <p>Voting Ended:</p>
                <p>{data.proposal.voteEnds}</p>
            </div>
        )
    }
    const recipient = () => {
        return(
            <div>
                <p>Recipient:</p>
                <p>{data.proposal.recipient}</p><br></br>
            </div>
        )
    }
    const ethGrant = () => {
        return(
            <div>
                <p>Grant Amount:</p>
                <p>{data.proposal.ethGrant}</p><br></br>
            </div>
        )
    }
    const newGrantAmount = () => {
        return(
            <div>
                <p>New Grant Amount:</p>
                <p>{data.proposal.newETHGrant}</p><br></br>
            </div>
        )
    }
    const propData = () => {
        return(
            <div>
                <p>Proposal Type: {data.proposal.propType}</p><br></br>

                {data.proposal.propType === "Issue Grant" && 
                    <div> 
                        {recipient()}
                        {ethGrant()}
                    </div>
                }
                {data.proposal.propType === "Modify Grant Size" && 
                    <div>
                        {newGrantAmount()}
                    </div>
                }

                <p>Description:</p>
                <p>{data.proposal.description}</p>
            </div>
        )
    }

    const descriptionClassName = () => {
        const className = (
            data.proposal.propState === "Active" ||
            data.proposal.propState === "Queued"
        )
        ? "ActiveDescription ProposalDescriptionFont"
        : "InactiveDescription ProposalDescriptionFont";
        return className;
    }

    const cardButtons = () => {
        return(
            <div className="ButtonGrid">
                {data.proposal.propState === "Active" &&
                    <div className="ButtonVoteFor ButtonStyle">
                        {data.proposal.memberHasVoted ?
                            <p>Member Already Voted!</p>
                            :
                            <p>
                                <a  className="ButtonVoteFont"
                                    onClick={data.proposal.voteFor}
                                    href="#">
                                    Vote For
                                </a>
                            </p>
                        }
                    </div>
                }
                {data.proposal.propState === "Active" &&
                    <div className="ButtonVoteAgainst ButtonStyle">
                        {data.proposal.memberHasVoted ?
                            <p>Member Already Voted!</p>
                            :
                            <p>
                                <a  className="ButtonVoteFont"
                                    onClick={data.proposal.voteAgainst}
                                    href="#">
                                    Vote Against
                                </a>
                            </p>
                        }
                    </div>
                }
                {data.proposal.propState === "Queued" &&
                    <div className="ButtonStyle">
                        <p>
                            <a  className="ExecuteButton"
                                onClick={data.proposal.execute}
                                href="#">
                                Execute Proposal
                            </a>
                        </p>
                    </div>
                }

            </div>
        )
    }


    return(
        <div className="ProposalGrid">
            {/* Header Row */}
                {proposalID()}
                {propState()}

            {/* Right Column */}
            <div className="ProposalVotingStats ProposalStatsFont">
                {data.proposal.propState === "Active" && (
                    <div>
                        {votesFor()}
                        {votesAgainst()}
                        {memberVoteCount()}
                        {quorum()}
                        {voteEnds()}
                    </div>
                )}
                {data.proposal.propState === "Queued" && (
                    <div>
                        {votesFor()}
                        {votesAgainst()}
                        {memberVoteCount()}
                        {quorum()}
                        {votingEnded()}
                    </div>
                )}
                {data.proposal.propState === "Pending" && (
                    <div>
                        {voteBegins()}
                        {voteEnds()}
                        {quorum()}
                    </div>
                )}
                {(
                    data.proposal.propState === "Defeated" ||
                    data.proposal.propState === "Expired" ||
                    data.proposal.propState === "Succeeded" 
                ) && (
                    <div>
                        {votesFor()}
                        {votesAgainst()}
                        {memberVoteCount()}
                        {voteEnds()}
                    </div>
                )}

            </div>
            
            {/* Center Cell */}
            <div className={descriptionClassName()}>
                {propData()}
            </div>

            {/* Buttons */}
            {cardButtons()}

        </div>

    )
}

export default ProposalCard;