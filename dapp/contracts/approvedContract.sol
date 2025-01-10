// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ApprovedContract {
    struct Winner {
        uint256 issue_id;
        uint256 contractor_id;
        string name;
        uint256 tenure;
        uint256 amount;
        string location;
        string verifiedBy;
        string approvedBy;
    }

    Winner public winner;
    bool public winnerSet = false;

    // Event to announce the winning contractor
    event WinnerDeclared(
        uint256 issue_id,
        uint256 contractor_id,
        string name,
        uint256 tenure,
        uint256 amount,
        string location,
        string verifiedBy,
        string approvedBy
    );

    function setWinner(
        uint256 _issue_id,
        uint256 _contractor_id,
        string memory _name,
        uint256 _tenure,
        uint256 _amount,
        string memory _location,
        string memory _verifiedBy,
        string memory _approvedBy
    ) public {
        require(!winnerSet, "Winner is already set!");
        winner = Winner(_issue_id, _contractor_id, _name, _tenure, _amount, _location, _verifiedBy, _approvedBy);
        winnerSet = true;

        emit WinnerDeclared(_issue_id, _contractor_id, _name, _tenure, _amount, _location, _verifiedBy, _approvedBy);
    }

    function getWinner()
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            string memory,
            string memory
        )
    {
        require(winnerSet, "Winner is not set yet!");
        return (
            winner.issue_id,
            winner.contractor_id,
            winner.name,
            winner.tenure,
            winner.amount,
            winner.location,
            winner.verifiedBy,
            winner.approvedBy
        );
    }
}