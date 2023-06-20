//@ts-nocheck
import GovernProposalCard from './GovernProposalCard';

const GovernDappMain = ({ selection, setSelection, proposals, quorum }) => {
  return (
    <div className="SubmissionForm">
  
       <p>Submit your proposals here!</p>
 
       <select
         className="SubmissionMenu"
         value={selection} // CREATE THIS
         key="selection"
         onChange={(e) => setSelection(e.target.value)}
         name="submissionID"
         id="submissionID"
       />

        <option key="Default">Select Option</option>
        <option key="NewGrant" value="NewGrant">
           Propose New Grant
        </option>
        <option key="ModifyGrantSize" value="ModifyGrantSize">
           Propose New Grant Amount
        </option>

        <div className="cardPresentation">
        {proposals.map((data) => {
            return <GovernProposalCard proposal={data} quorum={quorum} />;
        })}
        </div>

        {/* <div className="NewSubmission">
            <SubmissionCard
            selection={selection}
            recipient={grantRecipient}
            description={description}
            grantAmount={newGrantAmount}
            setGrantAmount={(input) => setGrantAmount(input)}
            submitNewGrantAmount={async () => submitNewGrantAmount()}
            setGrantRecipient={(input) => setGrantRecipient(input)}
            submitNewGrant={async () => submitNewGrant()}
            setDescription={(input) => setDescription(input)}
            />
        </div> */}
    </div>
  )
}

export default GovernDappMain