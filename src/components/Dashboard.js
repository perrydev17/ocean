import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {
        showAnswers: false
    }

    showUnanswered = () => {
        this.setState(() => ({
            showAnswers: false
        });
    }

    showAnswered = () => {
        this.setState(()=> ({
            showAnswers: true
        })
    }

    render() {
        const { showAnswers } = this.state;
        const { answered, unanswered } = this.props;

        const list = showAnswers === true ? answered : unanswered;

        return (
            <div>
                <div className='dashboard-toggle'>
                <button style={{textDecoration: showAnswers === false ? 'underline':null }}
                        onClick={this.showUnanswered}>
                    Unanswered
                </button>
                <span> | </span>
                <button style={{textDecoration: showAnswers === true ? 'underline':null }}
                        onClick={this.showAnswered}>
                    Answered
                </button>
                </div>
                <ul className="dashboard-list">
                    {list.map((poll) => (
                        <li key={poll.id}>
                            {poll.question}
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, polls, users}) {
    const answers = users[authedUser].answers;

    const answered = answers.map((id) => polls[id])
        .sort((a, b) => b.timestamp - a.timestamp);
    
    const unanswered = Object.keys(polls)
        .filter((id) = !answers.includes(id))
        .map((id) => polls[id])
        .sort((a, b) =>  b.timestamp - a.timestamp)

    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Dashboard);