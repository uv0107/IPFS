// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract LandRegistry {
    
    struct LandDetails {
        uint256 landID;
        string registrationID;
        string surveyNumber;
        string geoCoordinates;
        uint256 landArea;
        address owner;
        string email;
        uint256 phone;
        string governmentID;
        string residentialAddress;
        string cid;
        bool isRegistered;
    }

    mapping(uint256 => LandDetails) public lands;
    mapping(string => uint256) private regIdToLandId; // 🔍 registrationID => landID

    function registerLand(
        uint256 _landID,
        string memory _registrationID,
        string memory _surveyNumber,
        string memory _geoCoordinates,
        uint256 _landArea,
        address _owner,
        string memory _email,
        uint256 _phone,
        string memory _governmentID,
        string memory _residentialAddress,
        string memory _cid
    ) public {
        require(!lands[_landID].isRegistered, "Land already registered");
        require(regIdToLandId[_registrationID] == 0, "Registration ID already used");

        lands[_landID] = LandDetails({
            landID: _landID,
            registrationID: _registrationID,
            surveyNumber: _surveyNumber,
            geoCoordinates: _geoCoordinates,
            landArea: _landArea,
            owner: _owner,
            email: _email,
            phone: _phone,
            governmentID: _governmentID,
            residentialAddress: _residentialAddress,
            cid: _cid,
            isRegistered: true
        });

        regIdToLandId[_registrationID] = _landID; // Store reference
    }

    function getLandByRegistrationID(string memory _registrationID) public view returns (LandDetails memory) {
        uint256 landId = regIdToLandId[_registrationID];
        require(lands[landId].isRegistered, "Land not found");
        return lands[landId];
    }
}
