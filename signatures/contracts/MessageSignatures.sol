pragma solidity ^0.5.0;

contract MessageSignatures {
    uint256 public sigCount = 0;

    struct Signature {
        uint256 id;
        string content;
    }

    constructor() public {
        createSignature(
            "48411096a05de4ff7377de74c8585114d9a64f67461a210b07bc3ff0d2fef98b0126ca0d3416030b57c3954c093d9196878f2fe0fc563a04ac4292d9b48aaa39"
        );
    }

    mapping(uint256 => Signature) public signatures;

    event SignatureCreated(uint256 id, string content);

    function createSignature(string memory _content) public {
        sigCount++;
        signatures[sigCount] = Signature(sigCount, _content);
        emit SignatureCreated(sigCount, _content);
    }
}
