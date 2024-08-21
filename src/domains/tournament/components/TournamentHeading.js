import styles from "@/src/domains/tournament/Tournament.module.css";
import { Button } from "zephyrus-components";

export default function TournamentHeading({
    isStarted,
    handleStart,
    handleShuffle,
    handleQuit,
    handleReset,
    areContendersMissing,
    customStyles,
}) {
    return (
        <div className={`${styles.root} ${styles.tournamentHeading}`}>
            <h1>Tournament Table</h1>
            {!isStarted ? (
                <>
                    <Button
                        type="button"
                        size="large"
                        label="START TOURNAMENT"
                        customStyles={customStyles}
                        onClick={() => handleStart()}
                        disabled={areContendersMissing}
                    />
                    <Button
                        type="button"
                        size="large"
                        label="SHUFFLE MATCHES"
                        onClick={() => handleShuffle()}
                        customStyles={customStyles}
                    />

                    {areContendersMissing && (
                        <p className={styles.tournamentWarning}>
                            ⚠️ Select all contenders to procede
                        </p>
                    )}
                </>
            ) : (
                <>
                    <Button
                        type="button"
                        size="large"
                        label="QUIT TOURNAMENT"
                        onClick={() => handleQuit()}
                        customStyles={customStyles}
                    />
                    <Button
                        type="button"
                        size="large"
                        label="RESET TOURNAMENT"
                        onClick={() => handleReset()}
                        customStyles={customStyles}
                    />
                </>
            )}
        </div>
    );
}
