import {useGetSubstancesQuery} from '../../../store/slice/SubstanceSlice';
import type {SubstanceBean} from "../../../domain/model/substance.bean.ts";

export function SubstanceOverview() {
  const {data: substances, isLoading, isError, refetch, isFetching} = useGetSubstancesQuery();

  return (
    <div>
      <h1>Substance Overview Page</h1>

      <div style={{marginBottom: 12}}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Aktualisiere...' : 'Neu laden'}
        </button>
      </div>

      {isLoading && <p>Lade Substances…</p>}
      {isError && <p>Fehler beim Laden der Substances. Bitte erneut versuchen.</p>}

      {!isLoading && !isError && (
        <>
          {(!substances || substances.length === 0) ? (
            <p>Keine Substances gefunden.</p>
          ) : (
            <ul>
              {substances.map((s: SubstanceBean) => (
                <li key={s.id ?? JSON.stringify(s).slice(0, 60)}>
                  <strong>ID:</strong> {String(s.id ?? 'n/a')} &nbsp;|&nbsp; <strong>Name / Daten:</strong>
                  <pre style={{display: 'inline', marginLeft: 8}}>{JSON.stringify(s, null, 2)}</pre>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
