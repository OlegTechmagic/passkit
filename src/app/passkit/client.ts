import { config } from '@config';
import * as grpc from '@grpc/grpc-js';
import crypto from 'crypto';
import { ImagesClient } from 'passkit-node-sdk/io/core/a_rpc_images_grpc_pb';
import { MembersClient } from 'passkit-node-sdk/io/member/a_rpc_grpc_pb';

class PassKitClient {
  private membersClient;
  private imageClient;

  constructor() {
    const privateKey = crypto.createPrivateKey({
      // encoding: 'aes-256-cbc',
      format: 'pem',
      key: config.KEY_PEM,
      passphrase: config.PASSKIT_PASSPHRASE,
      type: 'pkcs8',
    });

    const channelCredential = grpc.credentials.createSsl(
      Buffer.from(config.CA_CHAIN),
      Buffer.from(privateKey.export({ format: 'pem', type: 'pkcs8' }).toString()),
      Buffer.from(config.CERTIFICATE_PEM),
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
