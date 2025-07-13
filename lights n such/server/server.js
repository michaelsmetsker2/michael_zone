const express = require('express');
const cors = require('cors');

const net = require('net');

const app = express();
const LISTEN_PORT = 3000; //port to listen on

const HOST = '192.168.0.104';
const PORT = 6742;

const HANDSHAKE_PACKET = Buffer.from('4f52474200000000280000000400000005000000', 'hex'); //protocol handshake packet
const LED_PACKET_ID = 1052        // packet id to update a single led

const KEYS = []; // Unpacketed keydata received from website

//builds update_single_led packet to be sent over tcp
const buildKeyPacket = (ledIndex, { r, g, b}) => {
    const buf = Buffer.alloc(24);
    Buffer.from('ORGB').copy(buf, 0);
    buf.writeUint32LE(0, 4);
    buf.writeUInt32LE(LED_PACKET_ID, 8);   // update single LED code
    buf.writeUInt32LE(8, 12);            // payload length
    buf.writeUInt32LE(ledIndex, 16);     // order of the key 
    buf.writeUInt8(r, 20);
    buf.writeUInt8(g, 21);
    buf.writeUInt8(b, 22);
    buf.writeUInt8(111, 23);               // buffer byte or some shit, we'll see
    return buf;
}

//sends built packets to openrgb server
const sendAllPackets = async () => {
    while (KEYS.length > 0) {
        const packet = KEYS.shift();
        client.write(packet);
        
    }

    KEYS.length = 0; //remove all packets
};

//socket for sending data to openRGB
const client = new net.Socket();

client.connect(PORT, HOST, () => {

    client.write(HANDSHAKE_PACKET); // now send it
});

//only response it should get is during the handshake
client.on('data', (data) => {

    if(data.equals(HANDSHAKE_PACKET)) {
        console.log("openRGB Handshake established successfully");
    } else {
        console.error("Protocol handshake failed or protocol version mismatch");
    }
});

client.on('error', (err) => {
    console.error(err);
})

//receive data from website
app.use(cors());            // Enable CORS for all origins
app.use(express.json());    // Parse JSON bodies

app.post('/api/colors', (req, res) => {
    const colors = req.body; // expecting an array of { buttonId, red, green, blue }
    
    if (!Array.isArray(colors)) {
        return res.status(400).send('Expected array');
    }

    let i = 1;
    colors.forEach(({ keyId, red, green, blue }) => {
        const packet = buildKeyPacket(keyId, { r: red, g: green, b: blue });
        KEYS.push(packet);
    });

    //send the completed list of packets to the backend
    sendAllPackets();

    res.sendStatus(200);
});

app.listen(LISTEN_PORT, () => {
    console.log(`listening on http://localhost:${LISTEN_PORT}`);
});