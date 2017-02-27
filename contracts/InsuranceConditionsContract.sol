pragma solidity ^0.4.4;

contract InsuranceConditionsContract {

    // Participants
    address public owner; // The owner of the contract, who is providing the rental service
    address public renter; // The address of who is renting the car
    address public rented; // The address identifying the car that was assigned to the renter
    address public insurer; // The address identifying the responsable for the insurance of this contract

    // Participants confirmations
    bool public renterConfirmed;
    bool public insurerConfirmed;

    // State of this contract rental
    uint public state; // 0 = pending confirmations, 1 = active, 2 = expired, 3 = cancelled

    // Insurance coverage contracted on this contract
    bool public coverageLiabilitieActive;
    bool public coverageAssistanceActive;
    bool public coverageRobberyActive;
    bool public coverageAllRiskActive;

    function InsuranceConditionsContract(address _renter,
                                         address _rented,
                                         address _insurer,
                                         bool _coverageLiabilitieActive,
                                         bool _coverageAssistanceActive,
                                         bool _coverageRobberyActive,
                                         bool _coverageAllRiskActive) {
        state = 0;
        owner = msg.sender;
        renterConfirmed = false;
        insurerConfirmed = false;

        renter = _renter;
        rented = _rented;
        insurer = _insurer;
        coverageLiabilitieActive = _coverageLiabilitieActive;
        coverageAssistanceActive = _coverageAssistanceActive;
        coverageRobberyActive = _coverageRobberyActive;
        coverageAllRiskActive = _coverageAllRiskActive;
    }

    function setRenter(address _renter) public returns (bool success){
        success = false;

        renter = _renter;

        return true;
     }

    function updateCondition(uint conditionId, bool conditionState) public returns (bool success){
        success = false;

        if (conditionId == 0) {
            coverageLiabilitieActive = conditionState;
        }

        if (conditionId == 1) {
            coverageAssistanceActive = conditionState;
        }

        if (conditionId == 2) {
            coverageRobberyActive = conditionState;
        }

        if (conditionId == 3) {
            coverageAllRiskActive = conditionState;
        }

        return true;
    }
}
