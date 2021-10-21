/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      crypto.js 1001 15/9/21, 12:19 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   crypto.js
 * @link         https://github.com/node-mongo/admin  Node MongoDB Admin
 * @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
 * @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
 * @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
 *  node-mongo-admin - License conditions:
 *  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
 *  This web application is available as Free Software and has no implied warranty or guarantee of usability.
 *  See licence.txt for the complete licensing outline.
 *  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
 *  See COPYRIGHT.js for copyright notices and further details.
 */

/**
 * Crypto service
 * Provides encryption and decryption methods
 *
 * @type {{CheckPrimeOptions: CheckPrimeOptions, scryptSync(password: BinaryLike, salt: BinaryLike, keylen: number, options?: ScryptOptions): Buffer, DSAEncoding: DSAEncoding, Sign: Sign, webcrypto, CipherCCM: CipherCCM, DecipherCCM: DecipherCCM, createDecipheriv: {(algorithm: CipherCCMTypes, key: CipherKey, iv: (BinaryLike | null), options: CipherCCMOptions): DecipherCCM, (algorithm: CipherGCMTypes, key: CipherKey, iv: (BinaryLike | null), options?: CipherGCMOptions): DecipherGCM, (algorithm: string, key: CipherKey, iv: (BinaryLike | null), options?: stream.TransformOptions): Decipher}, generateKeyPair: {(type: "rsa", options: RSAKeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "rsa", options: RSAKeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "rsa", options: RSAKeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "rsa", options: RSAKeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "rsa", options: RSAKeyPairKeyObjectOptions, callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "rsa-pss", options: RSAPSSKeyPairKeyObjectOptions, callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "dsa", options: DSAKeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "dsa", options: DSAKeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "dsa", options: DSAKeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "dsa", options: DSAKeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "dsa", options: DSAKeyPairKeyObjectOptions, callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "ec", options: ECKeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "ec", options: ECKeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "ec", options: ECKeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "ec", options: ECKeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "ec", options: ECKeyPairKeyObjectOptions, callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "ed25519", options: ED25519KeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "ed25519", options: ED25519KeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "ed25519", options: ED25519KeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "ed25519", options: ED25519KeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "ed25519", options: (ED25519KeyPairKeyObjectOptions | undefined), callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "ed448", options: ED448KeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "ed448", options: ED448KeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "ed448", options: ED448KeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "ed448", options: ED448KeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "ed448", options: (ED448KeyPairKeyObjectOptions | undefined), callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "x25519", options: X25519KeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "x25519", options: X25519KeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "x25519", options: X25519KeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "x25519", options: X25519KeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "x25519", options: (X25519KeyPairKeyObjectOptions | undefined), callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void, (type: "x448", options: X448KeyPairOptions<"pem", "pem">, callback: (err: (Error | null), publicKey: string, privateKey: string) => void): void, (type: "x448", options: X448KeyPairOptions<"pem", "der">, callback: (err: (Error | null), publicKey: string, privateKey: Buffer) => void): void, (type: "x448", options: X448KeyPairOptions<"der", "pem">, callback: (err: (Error | null), publicKey: Buffer, privateKey: string) => void): void, (type: "x448", options: X448KeyPairOptions<"der", "der">, callback: (err: (Error | null), publicKey: Buffer, privateKey: Buffer) => void): void, (type: "x448", options: (X448KeyPairKeyObjectOptions | undefined), callback: (err: (Error | null), publicKey: KeyObject, privateKey: KeyObject) => void): void}, KeyFormat: KeyFormat, JwkKeyExportOptions: JwkKeyExportOptions, getDiffieHellman(groupName: string): DiffieHellman, Hmac: Hmac, Certificate: Certificate, randomUUID(options?: RandomUUIDOptions): string, LargeNumberLike: LargeNumberLike, KeyType: KeyType, AsymmetricKeyDetails: AsymmetricKeyDetails, createHmac(algorithm: string, key: (BinaryLike | KeyObject), options?: stream.TransformOptions): Hmac, JsonWebKeyInput: JsonWebKeyInput, CipherKey: CipherKey, RsaPrivateKey: RsaPrivateKey, RSAPSSKeyPairKeyObjectOptions: RSAPSSKeyPairKeyObjectOptions, Encoding: Encoding, createSecretKey: {(key: NodeJS.ArrayBufferView): KeyObject, (key: string, encoding: BufferEncoding): KeyObject}, createPublicKey(key: (PublicKeyInput | string | Buffer | KeyObject | JsonWebKeyInput)): KeyObject, scrypt: {(password: BinaryLike, salt: BinaryLike, keylen: number, callback: (err: (Error | null), derivedKey: Buffer) => void): void, (password: BinaryLike, salt: BinaryLike, keylen: number, options: ScryptOptions, callback: (err: (Error | null), derivedKey: Buffer) => void): void}, createECDH(curveName: string): ECDH, KeyObject: KeyObject, X509Certificate: X509Certificate, RSAPSSKeyPairOptions: RSAPSSKeyPairOptions, HashOptions: HashOptions, KeyPairKeyObjectResult: KeyPairKeyObjectResult, DEFAULT_ENCODING: BufferEncoding, X448KeyPairOptions: X448KeyPairOptions, SignPrivateKeyInput: SignPrivateKeyInput, X25519KeyPairOptions: X25519KeyPairOptions, KeyLike: KeyLike, RSAKeyPairOptions: RSAKeyPairOptions, getCiphers(): string[], createPrivateKey(key: (PrivateKeyInput | string | Buffer | JsonWebKeyInput)): KeyObject, publicDecrypt(key: (RsaPublicKey | RsaPrivateKey | KeyLike), buffer: NodeJS.ArrayBufferView): Buffer, DSAKeyPairOptions: DSAKeyPairOptions, SigningOptions: SigningOptions, generatePrimeSync: {(size: number): ArrayBuffer, (size: number, options: GeneratePrimeOptionsBigInt): bigint, (size: number, options: GeneratePrimeOptionsArrayBuffer): ArrayBuffer, (size: number, options: GeneratePrimeOptions): (ArrayBuffer | bigint)}, ECKeyPairOptions: ECKeyPairOptions, ScryptOptions: ScryptOptions, pbkdf2(password: BinaryLike, salt: BinaryLike, iterations: number, keylen: number, digest: string, callback: (err: (Error | null), derivedKey: Buffer) => void): void, Cipher: Cipher, createVerify(algorithm: string, options?: stream.WritableOptions): Verify, pbkdf2Sync(password: BinaryLike, salt: BinaryLike, iterations: number, keylen: number, digest: string): Buffer, diffieHellman(options: {privateKey: KeyObject, publicKey: KeyObject}): Buffer, randomInt: {(max: number): number, (min: number, max: number): number, (max: number, callback: (err: (Error | null), value: number) => void): void, (min: number, max: number, callback: (err: (Error | null), value: number) => void): void}, CipherMode: CipherMode, X25519KeyPairKeyObjectOptions: X25519KeyPairKeyObjectOptions, Hash: Hash, getCipherInfo(nameOrNid: (string | number), options?: CipherInfoOptions): (CipherInfo | undefined), ED25519KeyPairOptions: ED25519KeyPairOptions, getCurves(): string[], pseudoRandomBytes: {(size: number): Buffer, (size: number, callback: (err: (Error | null), buf: Buffer) => void): void}, KeyObjectType: KeyObjectType, ED448KeyPairKeyObjectOptions: ED448KeyPairKeyObjectOptions, randomFill: {<T extends NodeJS.ArrayBufferView>(buffer: T, callback: (err: (Error | null), buf: T) => void): void, <T extends NodeJS.ArrayBufferView>(buffer: T, offset: number, callback: (err: (Error | null), buf: T) => void): void, <T extends NodeJS.ArrayBufferView>(buffer: T, offset: number, size: number, callback: (err: (Error | null), buf: T) => void): void}, createHash(algorithm: string, options?: HashOptions): Hash, CipherGCM: CipherGCM, DecipherGCM: DecipherGCM, CharacterEncoding: CharacterEncoding, checkPrime: {(value: LargeNumberLike, callback: (err: (Error | null), result: boolean) => void): void, (value: LargeNumberLike, options: CheckPrimeOptions, callback: (err: (Error | null), result: boolean) => void): void}, CipherCCMTypes: CipherCCMTypes, VerifyPublicKeyInput: VerifyPublicKeyInput, PrivateKeyInput: PrivateKeyInput, createCipher: {(algorithm: CipherCCMTypes, password: BinaryLike, options: CipherCCMOptions): CipherCCM, (algorithm: CipherGCMTypes, password: BinaryLike, options?: CipherGCMOptions): CipherGCM, (algorithm: string, password: BinaryLike, options?: stream.TransformOptions): Cipher}, privateEncrypt(privateKey: (RsaPrivateKey | KeyLike), buffer: NodeJS.ArrayBufferView): Buffer, VerifyKeyObjectInput: VerifyKeyObjectInput, BinaryToTextEncoding: BinaryToTextEncoding, RandomUUIDOptions: RandomUUIDOptions, generatePrime: {(size: number, callback: (err: (Error | null), prime: ArrayBuffer) => void): void, (size: number, options: GeneratePrimeOptionsBigInt, callback: (err: (Error | null), prime: bigint) => void): void, (size: number, options: GeneratePrimeOptionsArrayBuffer, callback: (err: (Error | null), prime: ArrayBuffer) => void): void, (size: number, options: GeneratePrimeOptions, callback: (err: (Error | null), prime: (ArrayBuffer | bigint)) => void): void}, DiffieHellman: DiffieHellman, sign: {(algorithm: (string | null | undefined), data: NodeJS.ArrayBufferView, key: (KeyLike | SignKeyObjectInput | SignPrivateKeyInput)): Buffer, (algorithm: (string | null | undefined), data: NodeJS.ArrayBufferView, key: (KeyLike | SignKeyObjectInput | SignPrivateKeyInput), callback: (error: (Error | null), data: Buffer) => void): void}, ECKeyPairKeyObjectOptions: ECKeyPairKeyObjectOptions, Decipher: Decipher, CipherGCMOptions: CipherGCMOptions, CipherCCMOptions: CipherCCMOptions, KeyExportOptions: KeyExportOptions, KeyPairSyncResult: KeyPairSyncResult, getHashes(): string[], createSign(algorithm: string, options?: stream.WritableOptions): Sign, CipherGCMTypes: CipherGCMTypes, hkdf(digest: string, irm: (BinaryLike | KeyObject), salt: BinaryLike, info: BinaryLike, keylen: number, callback: (err: (Error | null), derivedKey: ArrayBuffer) => void): void, X448KeyPairKeyObjectOptions: X448KeyPairKeyObjectOptions, createCipheriv: {(algorithm: CipherCCMTypes, key: CipherKey, iv: (BinaryLike | null), options: CipherCCMOptions): CipherCCM, (algorithm: CipherGCMTypes, key: CipherKey, iv: (BinaryLike | null), options?: CipherGCMOptions): CipherGCM, (algorithm: string, key: CipherKey, iv: (BinaryLike | null), options?: stream.TransformOptions): Cipher}, LegacyCharacterEncoding: LegacyCharacterEncoding, SecureHeapUsage: SecureHeapUsage, BasePrivateKeyEncodingOptions: BasePrivateKeyEncodingOptions, randomBytes: {(size: number): Buffer, (size: number, callback: (err: (Error | null), buf: Buffer) => void): void}, secureHeapUsed(): SecureHeapUsage, JsonWebKey: JsonWebKey, getFips(): (1 | 0), ED448KeyPairOptions: ED448KeyPairOptions, fips: boolean, ECDH: ECDH, checkPrimeSync(candidate: LargeNumberLike, options?: CheckPrimeOptions): boolean, GeneratePrimeOptions: GeneratePrimeOptions, privateDecrypt(privateKey: (RsaPrivateKey | KeyLike), buffer: NodeJS.ArrayBufferView): Buffer, CipherInfoOptions: CipherInfoOptions, GeneratePrimeOptionsArrayBuffer: GeneratePrimeOptionsArrayBuffer, BinaryLike: BinaryLike, publicEncrypt(key: (RsaPublicKey | RsaPrivateKey | KeyLike), buffer: NodeJS.ArrayBufferView): Buffer, Verify: Verify, RSAKeyPairKeyObjectOptions: RSAKeyPairKeyObjectOptions, constants, ECDHKeyFormat: ECDHKeyFormat, GeneratePrimeOptionsBigInt: GeneratePrimeOptionsBigInt, X509CheckOptions: X509CheckOptions, SignKeyObjectInput: SignKeyObjectInput, ED25519KeyPairKeyObjectOptions: ED25519KeyPairKeyObjectOptions, DSAKeyPairKeyObjectOptions: DSAKeyPairKeyObjectOptions, createDecipher: {(algorithm: CipherCCMTypes, password: BinaryLike, options: CipherCCMOptions): DecipherCCM, (algorithm: CipherGCMTypes, password: BinaryLike, options?: CipherGCMOptions): DecipherGCM, (algorithm: string, password: BinaryLike, options?: stream.TransformOptions): Decipher}, RsaPublicKey: RsaPublicKey, generateKey(type: ("hmac" | "aes"), options: {length: number}, callback: (err: (Error | null), key: KeyObject) => void): void, CipherInfo: CipherInfo, generateKeyPairSync: {(type: "rsa", options: RSAKeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "rsa", options: RSAKeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "rsa", options: RSAKeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "rsa", options: RSAKeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "rsa", options: RSAKeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "rsa-pss", options: RSAPSSKeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "rsa-pss", options: RSAPSSKeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "dsa", options: DSAKeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "dsa", options: DSAKeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "dsa", options: DSAKeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "dsa", options: DSAKeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "dsa", options: DSAKeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "ec", options: ECKeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "ec", options: ECKeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "ec", options: ECKeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "ec", options: ECKeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "ec", options: ECKeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "ed25519", options: ED25519KeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "ed25519", options: ED25519KeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "ed25519", options: ED25519KeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "ed25519", options: ED25519KeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "ed25519", options?: ED25519KeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "ed448", options: ED448KeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "ed448", options: ED448KeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "ed448", options: ED448KeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "ed448", options: ED448KeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "ed448", options?: ED448KeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "x25519", options: X25519KeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "x25519", options: X25519KeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "x25519", options: X25519KeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "x25519", options: X25519KeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "x25519", options?: X25519KeyPairKeyObjectOptions): KeyPairKeyObjectResult, (type: "x448", options: X448KeyPairOptions<"pem", "pem">): KeyPairSyncResult<string, string>, (type: "x448", options: X448KeyPairOptions<"pem", "der">): KeyPairSyncResult<string, Buffer>, (type: "x448", options: X448KeyPairOptions<"der", "pem">): KeyPairSyncResult<Buffer, string>, (type: "x448", options: X448KeyPairOptions<"der", "der">): KeyPairSyncResult<Buffer, Buffer>, (type: "x448", options?: X448KeyPairKeyObjectOptions): KeyPairKeyObjectResult}, randomFillSync<T extends NodeJS.ArrayBufferView>(buffer: T, offset?: number, size?: number): T, timingSafeEqual(a: NodeJS.ArrayBufferView, b: NodeJS.ArrayBufferView): boolean, verify: {(algorithm: (string | null | undefined), data: NodeJS.ArrayBufferView, key: (KeyLike | VerifyKeyObjectInput | VerifyPublicKeyInput), signature: NodeJS.ArrayBufferView): boolean, (algorithm: (string | null | undefined), data: NodeJS.ArrayBufferView, key: (KeyLike | VerifyKeyObjectInput | VerifyPublicKeyInput), signature: NodeJS.ArrayBufferView, callback: (error: (Error | null), result: boolean) => void): void}, createDiffieHellman: {(primeLength: number, generator?: (number | NodeJS.ArrayBufferView)): DiffieHellman, (prime: NodeJS.ArrayBufferView): DiffieHellman, (prime: string, primeEncoding: BinaryToTextEncoding): DiffieHellman, (prime: string, primeEncoding: BinaryToTextEncoding, generator: (number | NodeJS.ArrayBufferView)): DiffieHellman, (prime: string, primeEncoding: BinaryToTextEncoding, generator: string, generatorEncoding: BinaryToTextEncoding): DiffieHellman}, PublicKeyInput: PublicKeyInput, hkdfSync(digest: string, ikm: (BinaryLike | KeyObject), salt: BinaryLike, info: BinaryLike, keylen: number): ArrayBuffer}}
 */
const crypto = require('crypto');
//const {getRandomKey} = require("./crypto");

/**
 * Exported crypto service
 * @type {{}}
 */
module.exports = {}

/**
 * Properties required for safe encrypting
 * @type {{IV_BYTE_LEN: number, BLOCK_CIPHER: string, SALT_BYTE_LEN: number, KEY_BYTE_LEN: number, AUTH_TAG_BYTE_LEN: number}}
 */
const ALGORITHM = {
    /**
     * GCM is an authenticated encryption mode that
     * not only provides confidentiality but also
     * provides integrity in a secured way
     * */
    BLOCK_CIPHER: 'aes-256-gcm',

    /**
     * 128 bit auth tag is recommended for GCM
     */
    AUTH_TAG_BYTE_LEN: 16,

    /**
     * NIST recommends 96 bits or 12 bytes IV for GCM
     * to promote interoperability, efficiency, and
     * simplicity of design
     */
    IV_BYTE_LEN: 12,

    /**
     * Note: 256 (in algorithm name) is key size.
     * Block size for AES is always 128
     */
    KEY_BYTE_LEN: 32,

    /**
     * To prevent rainbow table attacks
     * */
    SALT_BYTE_LEN: 16
}

/**
 * @returns {Buffer}
 */
const getIv = () => crypto.randomBytes(ALGORITHM.IV_BYTE_LEN);

/**
 * Environment key
 */
const env_key = process.env.ENV_KEY;

/**
 * @returns {Buffer}
 */
module.exports.getRandomKey = () => crypto.randomBytes(ALGORITHM.KEY_BYTE_LEN);

/**
 * To prevent rainbow table attacks
 *
 * @returns {Buffer}
 */
module.exports.getSalt = () => crypto.randomBytes(ALGORITHM.SALT_BYTE_LEN);

/**
 * To be used when key needs to be generated based on password.
 * The caller of this function has the responsibility to clear
 * the Buffer after the key generation to prevent the password
 * from lingering in the memory
 *
 * @param password - The password to be used for generating key
 * @param salt
 * @returns {Buffer}
 */
module.exports.getKeyFromPassword = (password, salt) => {
    return crypto.scryptSync(password, salt, ALGORITHM.KEY_BYTE_LEN);
}

/**
 * Encrypt the given string
 * Make sure the 'buffer' is cleared after calling this to ensure the 'key' is not exposed
 *
 * @param string        String to be encrypted
 * @param key           The key to be used for encryption
 * @returns {String}
 */
module.exports.encrypt = (string, key = null) => {
    const iv = getIv();
    const encKey = key ? key : env_key; // set the correct key here
    /*const cipher = crypto.createCipheriv(
        ALGORITHM.BLOCK_CIPHER,
        encKey,
        iv,
        {
            'authTagLength': ALGORITHM.AUTH_TAG_BYTE_LEN
        }
    );
    let encryptedString = cipher.update(string);
    encryptedString = Buffer.concat([encryptedString, cipher.final()]);
    return Buffer.concat([iv, encryptedString, cipher.getAuthTag()]);*/

    const cipher = crypto.createCipheriv(
        ALGORITHM.BLOCK_CIPHER,
        encKey,
        iv
    );
    let encryptedString = Buffer.concat([cipher.update(string), cipher.final()]);
    /* Return object */
    /*return {
        iv: iv.toString('hex'),
        content: encryptedString.toString('hex')
    }*/
    /* Return custom joined string */
    return iv.toString('hex') + ":" + encryptedString.toString('hex')
}

/**
 * Decrypt the given encrypted string (must have been encrypted with this server)
 * Make sure the 'buffer' is cleared after calling this to ensure the 'key' is not exposed
 *
 * @param encrypted     Cipher text
 * @param key           The key to be used for decryption
 * @returns {String}
 */
module.exports.decrypt = (encrypted, key = null) => {
    const authTag = encrypted.slice(-16);
    const iv = encrypted.slice(0, 12);
    const encKey = key ? key : env_key; // set the correct key here
    /*const encryptedString = encrypted.slice(12, -16);
    const decipher = crypto.createDecipheriv(
        ALGORITHM.BLOCK_CIPHER,
        encKey,
        iv,
        {
            'authTagLength': ALGORITHM.AUTH_TAG_BYTE_LEN
        }
    );
    decipher.setAuthTag(authTag);
    let string = decipher.update(encryptedString);
    return Buffer.concat([string, decipher.final()]);*/
    const arr = encrypted.split(":");
    const decipher = crypto.createDecipheriv(
        ALGORITHM.BLOCK_CIPHER,
        encKey,
        Buffer.from(arr[0], 'hex')
    );
    const decrypted = Buffer.concat([decipher.update(Buffer.from(arr[1], 'hex')), decipher.final()]);
    return decrypted.toString()
}