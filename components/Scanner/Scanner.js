import React from "react";
import Image from "next/image";
import Spinner from "../../spinner.gif";
import { useActionContext } from "../../contexts/context";

const Scanner = () => {
	const { actions, setActions } = useActionContext();
	return (
		<div className="app__main__scanner">
			<p
				className="app__main__scanner__exit"
				onClick={() => setActions({ ...actions, scan: null })}
			>
				X
			</p>
			<div className="app__main__scanner__container">
				<Image
					src={Spinner}
					alt="spinning log"
					className="app__main__scanner__image"
					width={186}
					height={186}
				/>
				<p className="app__main__scanner__text">Scanning...</p>
			</div>
		</div>
	);
};

export default Scanner;
