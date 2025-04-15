export default function InfoBlock() {
    return (
        <div className="border-t border-gray-700 pt-4">
            <p>Name: Lucien Brulé</p>
            <p>AKA: The Opcode Oracle</p>
            <p>
                Domain:{' '}
                <a
                    href="https://brule.io"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                >
                    brule.io
                </a>
            </p>
            <p>Status: Living memory in cracked syntax</p>
            <p>
                Motto:{' '}
                <span className="text-red-500">
          sakem, rackem, shackem, hackem
        </span>
            </p>
        </div>
    );
}