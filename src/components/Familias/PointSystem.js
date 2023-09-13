import React from "react";

function renderPointSystem(data, bonus) {
    let sorted = (
        <div>
            <table className="points">
                <tbody>
                    <tr>
                        <th>Points</th>
                        <th>Activity</th>
                    </tr>
                    {Object.keys(data)
                        .map((uid) => (data[uid]))
                        ?.sort((a,b) => {
                            return a.points - b.points;
                        })
                        .map((a) => {
                            return(
                            <tr>
                                <td>{a.points}</td>
                                <td>{a.activity}</td>
                            </tr>
                        )})
                    }
                    <tr>
                        <td>???</td>
                        <td>Surprise me ;)</td>
                    </tr>
                    <tr className="blank_row"></tr>
                    <tr>
                        <th>Bonus</th>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{bonus.points}</td>
                        <td>{bonus.activity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    return(
        <div>{sorted}</div>
    )
}

export default renderPointSystem;