package com.ahmed.miniprojet1.service;

import com.ahmed.miniprojet1.dto.BusDTO;
import com.ahmed.miniprojet1.entities.Bus;
import com.ahmed.miniprojet1.entities.Marque;
import com.ahmed.miniprojet1.repos.BusRepository;
import com.ahmed.miniprojet1.repos.MarqueRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusServiceImpl implements BusService {
    @Autowired
    private BusRepository busRepository;
    @Autowired
    private MarqueRepository marqueRepository;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public BusDTO saveBus(BusDTO bus) {
        return convertEntityToDto(busRepository.save(convertDtoToEntity(bus)));
    }

    @Override
    public BusDTO updateBus(BusDTO bus) {
        return convertEntityToDto(busRepository.save(convertDtoToEntity(bus)));
    }

    @Override
    public void deleteBus(Bus bus) {
        busRepository.delete(bus);
    }

    @Override
    public void deleteBusById(Long id) {
        busRepository.deleteById(id);
    }

    @Override
    public BusDTO getBus(Long id) {
        return convertEntityToDto(busRepository.findById(id).get());
    }


    @Override
    public List<BusDTO> getAllBuses() {
        return busRepository.findAll().stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<Bus> getAllBusParPage(int page, int size) {
        return busRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public List<Bus> getAllBus() {
        return busRepository.findAll();
    }

    @Override
    public List<Bus> findByTypeBus(String typeBus) {
        return busRepository.findByTypeBus(typeBus);
    }

    @Override
    public List<Bus> findByTypeBusContains(String typeBus) {
        return busRepository.findByTypeBusContains(typeBus);
    }

    @Override
    public List<Bus> findByTypeBusCouleur(String typeBus, String couleur) {
        return busRepository.findByTypeBusCouleur(typeBus, couleur);
    }

    @Override
    public List<Bus> findByMarque(Marque marque) {
        return busRepository.findByMarque(marque);
    }

    @Override
    public List<Bus> findByMarqueIdMarque(Long id) {
        return busRepository.findByMarqueIdMarque(id);
    }

    @Override
    public List<Bus> findByOrderByTypeBusAsc() {
        return busRepository.findByOrderByTypeBusAsc();
    }

    @Override
    public List<Bus> trierBusTypeBusCouleur() {
        return busRepository.trierBusTypeBusCouleur();
    }

    @Override
    public List<Marque> getAllMarque() {
        return marqueRepository.findAll();
    }

    @Override
    public BusDTO convertEntityToDto(Bus bus) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        BusDTO busDTO = modelMapper.map(bus, BusDTO.class);
        return busDTO;
    }
    @Override
    public Bus convertDtoToEntity(BusDTO busDTO) {
        Bus bus = new Bus();
        bus = modelMapper.map(busDTO, Bus.class);
        return bus;

    }
    }
