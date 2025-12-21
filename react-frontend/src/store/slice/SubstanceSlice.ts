import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {SubstanceBean} from '../../domain/model/substance.bean.ts';

interface SubstanceState {
  substances: SubstanceBean[];
}

const initialState: SubstanceState = {
  substances: []
};

const substanceSlice = createSlice({
  name: 'substance',
  initialState,
  reducers: {
    addSubstance(state, action: PayloadAction<SubstanceBean>) {
      state.substances.push(action.payload);
    },
    removeSubstance(state, action: PayloadAction<number>) {
      state.substances = state.substances.filter(s => Number(s.id) !== action.payload);
    },
    patchSubstance(state, action: PayloadAction<{ substanceId: number; patchedSubstance: SubstanceBean }>) {
      state.substances = state.substances.map(s =>
        Number(s.id) === action.payload.substanceId ? action.payload.patchedSubstance : s
      );
    },
    initSubstances(state, action: PayloadAction<SubstanceBean[]>) {
      state.substances = action.payload;
    }
  }
});

export const {addSubstance, removeSubstance, patchSubstance, initSubstances} = substanceSlice.actions;
export default substanceSlice.reducer;

// Selektoren erwarten den Root-State in Form { substance: SubstanceState }
// (keine Abhängigkeit zum RootState-Typ, um zyklische Importe zu vermeiden)
export const selectSubstances = (state: { substance: SubstanceState }) => state.substance.substances;
export const selectSubstanceById = (id: number) => (state: { substance: SubstanceState }) =>
  state.substance.substances.find(s => Number(s.id) === id);
export const selectEntitiesMap = (state: { substance: SubstanceState }): Record<number, SubstanceBean> =>
  Object.fromEntries(state.substance.substances.map(s => [s.id, s]));

// ---------------------------------------------------------------------
// RTK Query API für Substances (eingebettet in diese Datei, damit keine neue Datei nötig ist)
// Base URL anpassen falls dein Backend unter anderem Pfad liegt (z.B. process.env...)
export const substanceApi = createApi({
  reducerPath: 'substanceApi',
  // API-Host/Port auf 8080 setzen
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080'}),
  tagTypes: ['Substance'],
  endpoints: (builder) => ({
    getSubstances: builder.query<SubstanceBean[], void>({
      query: () => '/substance',
      providesTags: (result) =>
        result
          ? [...result.map((r) => ({type: 'Substance' as const, id: r.id})), {type: 'Substance'}]
          : [{type: 'Substance'}],
    }),
    addSubstance: builder.mutation<SubstanceBean, Partial<SubstanceBean>>({
      query: (body) => ({url: '/substance', method: 'POST', body}),
      invalidatesTags: [{type: 'Substance'}],
    }),
    updateSubstance: builder.mutation<SubstanceBean, { id: number; patch: Partial<SubstanceBean> }>({
      query: ({id, patch}) => ({url: `/substance/${id}`, method: 'PATCH', body: patch}),
      invalidatesTags: (_, __, arg) => [{type: 'Substance', id: arg.id}],
    }),
    deleteSubstance: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({url: `/substance/${id}`, method: 'DELETE'}),
      invalidatesTags: (_, __, id) => [{type: 'Substance', id}],
    }),
  }),
});

// Exportiere die automatisch erzeugten Hooks
export const {
  useGetSubstancesQuery,
  useAddSubstanceMutation,
  useUpdateSubstanceMutation,
  useDeleteSubstanceMutation,
} = substanceApi;
