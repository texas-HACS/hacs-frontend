import React from "react";

function renderScoreboard(data) {
    let sorted = (
        <div>
            <table className="scoreboard">
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Familia</th>
                        <th>Points</th>
                    </tr>
                    {Object.keys(data)
                        .map((uid) => (data[uid]))
                        ?.sort((a,b) => {
                            return b.points - a.points;
                        })
                        .map((f, index) => {
                            return(
                            <tr>
                                <td>{index + 1}</td>
                                <td>{f.name}</td>
                                <td>{f.points}</td>
                            </tr>
                        )})
                    }
                </tbody>
            </table>
        </div>
    )

    return(
        <div>{sorted}</div>
    )
}

export default renderScoreboard;