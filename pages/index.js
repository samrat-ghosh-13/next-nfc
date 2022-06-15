import Head from "next/head";
import Image from "next/image";
import { useActionContext } from "../contexts/context";
import Scan from "../containers/Scan/Scan";
import Write from "../containers/Write/Write";
import nfc from "../nfc.svg";
import Fileupload from "../components/FileUpload";

export default function Home() {
	const { actions, setActions } = useActionContext();
	const { scan, write } = actions || {};

	const onHandleAction = (actions) => {
		setActions({ ...actions });
	};

	function onFileupload(data) {
		console.log(JSON.stringify(data));
		const response = fetch("/api/uploadFile", {
			body: data,
			method: "POST",
		});
		console.log(response);
	}

	return (
		<div className="app">
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="app__main">
				<div className="app__main__container">
					<Image
						src={nfc}
						className="App-logo"
						alt="logo"
						width={64}
						height={64}
					/>
					<h1>NFC Scanner</h1>
					<button
						onClick={() => onHandleAction({ scan: "scanning", write: null })}
						className="app__main__container__btn"
					>
						Scan
					</button>
					{/* <button
							onClick={() => onHandleAction({ scan: null, write: "writing" })}
							className="btn"
						>
							Write
						</button> */}
				</div>
				{scan && <Scan />}
				{write && <Write />}
				<Fileupload onChange={onFileupload} name="trash" />
			</main>

			<footer className="app__footer">
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className="app__footer__logo">
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
