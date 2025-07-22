import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as svc from "../apiCalls/noteApiCalls";

export default function useGameNotes(userId) {
	const qc = useQueryClient();

	const {
		data: notes = [],
		isLoading,
		error,
	} = useQuery(["gameNotes", userId], () => svc.fetchGameNotes(userId), {
		enabled: Boolean(userId),
	});

	const create = useMutation((note) => svc.createGameNote(userId, note), {
		onSuccess: () => qc.invalidateQueries(["gameNotes", userId]),
	});

	const update = useMutation(
		({ id, changes }) => svc.updateGameNote(id, changes),
		{ onSuccess: () => qc.invalidateQueries(["gameNotes", userId]) },
	);

	const deleteNote = useMutation(({ noteId }) => svc.deleteGameNote(noteId), {
		onSuccess: () => qc.invalidateQueries(["gameNotes", userId]),
	});

	return { notes, isLoading, error, create, update, deleteNote };
}
