export default function mapFirebaseUser(firebaseUser: any) {
  const mappedUser = {
    accessToken: firebaseUser.accessToken,
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || "Usuário sem nome",
    email: firebaseUser.email,
    photoUrl: firebaseUser.photoURL || null,
  };

  return mappedUser;
}
