import { config } from '@config';
import * as grpc from '@grpc/grpc-js';
import crypto from 'crypto';
import fs from 'fs';
import { ImagesClient } from 'passkit-node-sdk/io/core/a_rpc_images_grpc_pb';
import { MembersClient } from 'passkit-node-sdk/io/member/a_rpc_grpc_pb';

class PassKitClient {
  private membersClient;
  private imageClient;

  constructor() {
    const privateKeyEncBytes = fs.readFileSync(config.PASSKIT_PRIVATE_KEY_PATH);
    const privateKey = crypto.createPrivateKey({
      // encoding: 'aes-256-cbc',
      format: 'pem',
      key: privateKeyEncBytes,
      passphrase: config.PASSKIT_PASSPHRASE,
      type: 'pkcs8',
    });

    const channelCredential = grpc.credentials.createSsl(
      fs.readFileSync(config.PASSKIT_ROOT_CERT_PATH),
      Buffer.from(privateKey.export({ format: 'pem', type: 'pkcs8' }).toString()),
      fs.readFileSync(config.PASSKIT_CERTIFICATE_PATH),
    );

    const grpcAddress = `${config.PASSKIT_ADDRESS}:${config.PASSKIT_PORT}`;

    this.membersClient = new MembersClient(grpcAddress, channelCredential);
    this.imageClient = new ImagesClient(grpcAddress, channelCredential);
  }

  getMembershipClient() {
    return this.membersClient;
  }

  getImagesClient() {
    return this.imageClient;
  }
}

class Singleton {
  static instance: PassKitClient;

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new PassKitClient();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

export default Singleton;
