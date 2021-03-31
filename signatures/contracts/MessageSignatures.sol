pragma solidity ^0.8.3;

contract MessageSignatures {
    uint256 public sigCount = 0;

    struct Signature {
        uint256 id;
        string content;
    }

    mapping(uint256 => Signature) public signatures;

    event SignatureCreated(uint256 id, string content);

    function createSignature(string memory _content) public {
        sigCount++;
        signatures[sigCount] = Signature(sigCount, _content);
        emit SignatureCreated(sigCount, _content);
    }
}
