package calendar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import calendar.model.Tarefa;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa,Long> {
    @Query(value = "select t from Tarefa t where t.titulo like %?1%")
    List<Tarefa> buscarPorTitulo(String titulo);
}