
import { Link } from "react-router-dom";

const Questions = ({ questions,onDeleteMember }) => {
    return (
        <div>
            <h3>{questions.question +"      "}
            <Link
                to={{ pathname: `/editQuestionnaire/${questions.id}` }}
            >🖊</Link>
            <button
                onClick={() => onDeleteMember(questions.id)}
                color="secondary"
                aria-label="Delete"
            >
                ❌
            </button>
            </h3>

        </div>
    )
}

export default Questions
