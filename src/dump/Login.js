// import React, { useEffect, useState, useRef } from "react";
// import firebase from "../firebase";

// const Login = () => {
//   const [recaptcha, setRecaptcha] = useState();
//   const element = useRef();
//   const phonenumber = useRef();
//   const otp = useRef();

//   useEffect(() => {
//     const verifier = new firebase.auth.RecaptchaVerifier(element.current, {
//       size: "invisible",
//     });
//     if (!recaptcha) {
//       verifier.verify().then(() => setRecaptcha(verifier));
//     }
//     return () => {
//       verifier.clear();
//     };
//   }, []);

//   const [loading, setLoading] = useState(false);

//   const onSignInSubmit = () => {
//     setLoading(true);
//     firebase
//       .auth()
//       .signInWithPhoneNumber(phonenumber.current.value, recaptcha)
//       .then((confirmationResult) => {
//         setLoading(false);
//         window.confirmationResult = confirmationResult;
//         // const code = prompt("Enter OTP", "");
//         // confirmationResult
//         //   .confirm(code)
//         //   .then((result) => {
//         //     console.log("res=>", result);
//         //     setLoading(false);
//         //   })
//         //   .catch((error) => {
//         //     console.log("err=>", error);
//         //     setLoading(false);
//         //   });
//       })
//       .catch((error) => {
//         console.log("error=>", error);
//         setLoading(false);
//       });
//   };

//   const verifyOTP = () => {
//     const code = otp.current.value;

//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         console.log("res=>", result);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("err=>", error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <div>
//         <label>Phone number</label>
//         <br />
//         <input
//           type="text"
//           placeholder="phone number"
//           style={{ border: "1px solid black" }}
//           ref={phonenumber}
//         />
//         <button
//           style={{ border: "1px solid black", margin: 5, padding: 5 }}
//           onClick={onSignInSubmit}
//         >
//           {loading ? "Please wait...." : `Get OTP`}
//         </button>
//         <br />
//         <input
//           type="text"
//           placeholder="OTP"
//           style={{ border: "1px solid black" }}
//           ref={otp}
//         />
//         <button
//           style={{ border: "1px solid black", margin: 5, padding: 5 }}
//           onClick={verifyOTP}
//         >
//           Validate
//         </button>
//         <div id="recaptcha-container" ref={element}></div>
//       </div>
//     </div>
//   );
// };

// export default Login;
