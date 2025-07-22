import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as svc from "../apiCalls/noteApiCalls";

export default function useGameNotes() {
	const qc = useQueryClient();

	const {
		data: notes = [],
		isLoading,
		error,
	} = useQuery(["gameNotes"], () => svc.fetchGameNotes());

	const create = useMutation((note) => svc.createGameNote(note), {
		onSuccess: () => qc.invalidateQueries(["gameNotes"]),
	});

	const update = useMutation(
		({ id, changes }) => svc.updateGameNote(id, changes),
		{ onSuccess: () => qc.invalidateQueries(["gameNotes"]) },
	);

	const deleteNote = useMutation(({ noteId }) => svc.deleteGameNote(noteId), {
		onSuccess: () => qc.invalidateQueries(["gameNotes"]),
	});

	return { notes, isLoading, error, create, update, deleteNote };
}
